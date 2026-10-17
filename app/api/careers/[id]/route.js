import { NextResponse } from "next/server";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

import connectDB from "../../../config/db";
import Career from "../../../config/models/Career";

function authenticate(request) {
  const token = request.cookies.get("adminToken")?.value;

  if (!token) {
    throw new Error("Unauthorized");
  }

  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw new Error("Unauthorized");
  }
}

// GET SINGLE CAREER
// PUBLIC - No admin authentication required
export async function GET(request, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid career ID",
        },
        { status: 400 },
      );
    }

    const career = await Career.findOne({
      _id: id,
      status: true,
    });

    if (!career) {
      return NextResponse.json(
        {
          success: false,
          message: "Career vacancy not found",
        },
        { status: 404 },
      );
    }

    // Check deadline
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const deadline = new Date(career.deadline);

    if (deadline < today) {
      return NextResponse.json(
        {
          success: false,
          message: "This career opportunity has expired.",
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        career,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Get single career error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch career vacancy",
      },
      { status: 500 },
    );
  }
}

// UPDATE CAREER
// ADMIN ONLY
export async function PUT(request, { params }) {
  try {
    await connectDB();

    authenticate(request);

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid career ID",
        },
        { status: 400 },
      );
    }

    const body = await request.json();

    const {
      title,
      department,
      location,
      employmentType,
      salary,
      requirements,
      description,
      deadline,
      status,
    } = body;

    if (
      !title ||
      !department ||
      !location ||
      !requirements ||
      !description ||
      !deadline
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Title, department, location, requirements, description and deadline are required.",
        },
        { status: 400 },
      );
    }

    const career = await Career.findByIdAndUpdate(
      id,
      {
        title,
        department,
        location,
        employmentType,
        salary: salary || "",
        requirements,
        description,
        deadline,
        status: status ?? true,
      },
      {
        returnDocument: "after",
        runValidators: true,
      },
    );

    if (!career) {
      return NextResponse.json(
        {
          success: false,
          message: "Career vacancy not found",
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Career vacancy updated successfully",
        career,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Update career error:", error);

    if (error.message === "Unauthorized") {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 },
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update career vacancy",
      },
      { status: 500 },
    );
  }
}

// DELETE CAREER
// ADMIN ONLY
export async function DELETE(request, { params }) {
  try {
    await connectDB();

    authenticate(request);

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid career ID",
        },
        { status: 400 },
      );
    }

    const career = await Career.findByIdAndDelete(id);

    if (!career) {
      return NextResponse.json(
        {
          success: false,
          message: "Career vacancy not found",
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Career vacancy deleted successfully",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Delete career error:", error);

    if (error.message === "Unauthorized") {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 },
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete career vacancy",
      },
      { status: 500 },
    );
  }
}
