import { NextResponse } from "next/server";
import connectDB from "../../../config/db";
import User from "../../../config/models/User";
import jwt from "jsonwebtoken";

export async function GET(request) {
  try {
    await connectDB();

    // Get userToken from cookies
    const token = request.cookies.get("userToken")?.value;

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: "Not authenticated",
        },
        { status: 401 },
      );
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 },
      );
    }

    if (!user.status) {
      return NextResponse.json(
        {
          success: false,
          message: "Your account is inactive",
        },
        { status: 403 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        user,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Authentication error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Invalid or expired token",
      },
      { status: 401 },
    );
  }
}
