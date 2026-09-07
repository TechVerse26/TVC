// ==========================================================================
// admin/exams.js — Exam data source
// The exam-management UI (create/edit/delete exams & questions) has been
// removed along with the rest of the exam feature. This file now only
// fetches the exams collection so the Leaderboard section's "Exam" filter
// (js/admin/leaderboard.js) can still populate itself from real data.
// ==========================================================================
import { db } from "../firebase-config.js";
import {
  collection, getDocs,
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

export let currentExams = [];

export async function loadExamsTable() {
  const snap = await getDocs(collection(db, "exams"));
  currentExams = snap.docs
    .map((d) => ({ id: d.id, ...d.data() }))
    .sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));
}
