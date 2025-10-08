import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { doc, deleteDoc, updateDoc, getDoc, serverTimestamp } from "firebase/firestore";

const TODOS_COLLECTION = "todos";

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const ref = doc(db, TODOS_COLLECTION, params.id);
    const snap = await getDoc(ref);
    if (!snap.exists()) return NextResponse.json({ error: "No encontrado" }, { status: 404 });
    return NextResponse.json({ id: snap.id, ...snap.data() });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message ?? "Error al obtener" }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const payload: Record<string, unknown> = {};
    if (typeof body.text === "string") payload.text = body.text.trim();
    if (typeof body.completed === "boolean") payload.completed = body.completed;
    if (Object.keys(payload).length === 0) {
      return NextResponse.json({ error: "Nada que actualizar" }, { status: 400 });
    }
    payload.updatedAt = serverTimestamp();
    const ref = doc(db, TODOS_COLLECTION, params.id);
    await updateDoc(ref, payload);
    return NextResponse.json({ ok: true });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message ?? "Error al actualizar" }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const ref = doc(db, TODOS_COLLECTION, params.id);
    await deleteDoc(ref);
    return NextResponse.json({ ok: true });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message ?? "Error al eliminar" }, { status: 500 });
  }
}


