import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

// GET → fetch tasks for a project
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const projectId = searchParams.get("projectId");

    if (!projectId) {
      return NextResponse.json(
        { message: "projectId query param is required" },
        { status: 400 }
      );
    }

    const tasksCollection = collection(db, "projects", projectId, "tasks");
    const querySnapshot = await getDocs(tasksCollection);

    const tasks = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json({ tasks }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to fetch tasks" },
      { status: 500 }
    );
  }
}

// POST → create new task under a project
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, projectId } = body;

    if (!title || !projectId) {
      return NextResponse.json(
        { message: "Title and projectId are required" },
        { status: 400 }
      );
    }

    const tasksCollection = collection(db, "projects", projectId, "tasks");
    const docRef = await addDoc(tasksCollection, {
      title,
      status: "Todo",
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json(
      { message: "Task created successfully", id: docRef.id },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to create task" },
      { status: 500 }
    );
  }
}

// PUT → update task (title, description, status)
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, projectId, title, status } = body;

    if (!id || !projectId) {
      return NextResponse.json(
        { message: "Task id and projectId are required" },
        { status: 400 }
      );
    }

    const taskRef = doc(db, "projects", projectId, "tasks", id);

    await updateDoc(taskRef, {
      ...(title && { title }),
      ...(status && { status }),
    });

    return NextResponse.json(
      { message: "Task updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to update task" },
      { status: 500 }
    );
  }
}

// DELETE → remove task
export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, projectId } = body;

    if (!id || !projectId) {
      return NextResponse.json(
        { message: "Task id and projectId are required" },
        { status: 400 }
      );
    }

    // Firestore doc reference banao
    const taskRef = doc(db, "projects", projectId, "tasks", id);
    await deleteDoc(taskRef);

    return NextResponse.json(
      { message: "Task deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to delete task" },
      { status: 500 }
    );
  }
}
