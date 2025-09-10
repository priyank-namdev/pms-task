import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

// GET → fetch all projects
export async function GET() {
  try {
    const querySnapshot = await getDocs(collection(db, "projects"));
    const projects = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json({ projects }, { status: 200 });
  } catch (error) {
    console.error("error-->", error);
    return NextResponse.json(
      { message: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}

// POST → create a new project
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, description } = body;

    if (!name || !description) {
      return NextResponse.json(
        { message: "Name and description are required" },
        { status: 400 }
      );
    }

    const docRef = await addDoc(collection(db, "projects"), {
      name,
      description,
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json(
      { message: "Project created successfully", id: docRef.id },
      { status: 201 }
    );
  } catch (error) {
    console.error("error-->", error);
    return NextResponse.json(
      { message: "Failed to create project" },
      { status: 500 }
    );
  }
}
