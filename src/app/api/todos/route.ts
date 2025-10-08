import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, addDoc, getDocs, query, orderBy, serverTimestamp } from "firebase/firestore";

const TODOS_COLLECTION = "todos";

export async function GET() {
  try {
    const q = query(collection(db, TODOS_COLLECTION), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return NextResponse.json({ todos: data });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message ?? "Error al listar" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const text: string = (body?.text ?? "").toString().trim();
    if (!text) {
      return NextResponse.json({ error: "Texto requerido" }, { status: 400 });
    }
    const docRef = await addDoc(collection(db, TODOS_COLLECTION), {
      text,
      completed: false,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return NextResponse.json({ id: docRef.id });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message ?? "Error al crear" }, { status: 500 });
  }
}


