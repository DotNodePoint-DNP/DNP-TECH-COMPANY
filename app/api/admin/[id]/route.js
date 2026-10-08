import { NextResponse } from "next/server";
import connectDB from "../../../config/db";
import Admin from "../../../config/models/Admin";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

export async function GET(request, { params }) {
  try {
    await connectDB();

    const token = request.cookies.get("adminToken")?.value;

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized. Please login first.",
        },
        { status: 401 },
      );
    }

    jwt.verify(token, process.env.JWT_SECRET);

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid admin ID",
        },
        { status: 400 },
      );
    }

    const admin = await Admin.findById(id).select("-password");

    if (!admin) {
      return NextResponse.json(
        {
          success: false,
          message: "Admin not found",
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        admin,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Get single admin error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch admin",
      },
      { status: 500 },
    );
  }
}

export async function PUT(request, { params }) {
  try {
    await connectDB();

    const token = request.cookies.get("adminToken")?.value;

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized. Please login first.",
        },
        { status: 401 },
      );
    }

    jwt.verify(token, process.env.JWT_SECRET);

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid admin ID",
        },
        { status: 400 },
      );
    }

    const body = await request.json();

    const admin = await Admin.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    }).select("-password");

    if (!admin) {
      return NextResponse.json(
        {
          success: false,
          message: "Admin not found",
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Admin updated successfully",
        admin,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Update admin error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update admin",
      },
      { status: 500 },
    );
  }
}
export async function DELETE(request, { params }) {
  try {
    await connectDB();

    const token = request.cookies.get("adminToken")?.value;

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized. Please login first.",
        },
        { status: 401 },
      );
    }

    jwt.verify(token, process.env.JWT_SECRET);

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid admin ID",
        },
        { status: 400 },
      );
    }

    const admin = await Admin.findByIdAndDelete(id);

    if (!admin) {
      return NextResponse.json(
        {
          success: false,
          message: "Admin not found",
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Admin deleted successfully",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Delete admin error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete admin",
      },
      { status: 500 },
    );
  }
}
