import { NextResponse } from "next/server";
import connectDB from "../../config/db";
import Career from "../../config/models/Career";
import jwt from "jsonwebtoken";

// CHECK ADMIN AUTHENTICATION
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

// GET ALL ACTIVE CAREERS
// PUBLIC - No admin login required
export async function GET(request) {
  try {
    await connectDB();

    const careers = await Career.find({
      status: true,
    }).sort({
      createdAt: -1,
    });

    return NextResponse.json(
      {
        success: true,
        count: careers.length,
        careers,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Get careers error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch careers",
      },
      { status: 500 },
    );
  }
}

// CREATE CAREER
// ADMIN ONLY
export async function POST(request) {
  try {
    await connectDB();

    authenticate(request);

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

    const career = await Career.create({
      title,
      department,
      location,
      employmentType: employmentType || "Full-time",
      salary: salary || "",
      requirements,
      description,
      deadline,
      status: status ?? true,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Career vacancy created successfully",
        career,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Create career error:", error);

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
        message: "Failed to create career vacancy",
      },
      { status: 500 },
    );
  }
}
