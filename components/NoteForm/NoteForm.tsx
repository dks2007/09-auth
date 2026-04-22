"use client";

import { ChangeEvent } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { CreateNoteRequest } from "../../types/note";
import { createNote } from "../../lib/server-actions";
import styles from "./NoteForm.module.css";
import { useNoteStore } from "../../lib/store/noteStore";

interface NoteFormProps {
  onCancel: () => void;
}

export default function NoteForm({ onCancel }: NoteFormProps) {
  const queryClient = useQueryClient();
  const draft = useNoteStore((state) => state.draft);
  const setDraft = useNoteStore((state) => state.setDraft);
  const clearDraft = useNoteStore((state) => state.clearDraft);

  const createMutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      clearDraft();
      onCancel();
      toast.success("Note created successfully");
    },
    onError: () => {
      toast.error("Failed to create note");
    },
  });

  const handleFieldChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = event.target;

    setDraft({
      ...draft,
      [name]: value,
    } as CreateNoteRequest);
  };

  const handleCreateNote = async (formData: FormData) => {
    const title = String(formData.get("title") ?? "").trim();
    const content = String(formData.get("content") ?? "").trim();
    const tag = String(
      formData.get("tag") ?? "Todo",
    ) as CreateNoteRequest["tag"];

    if (!title) {
      toast.error("Title is required");
      return;
    }

    if (title.length < 3) {
      toast.error("Title must be at least 3 characters");
      return;
    }

    if (title.length > 50) {
      toast.error("Title must be at most 50 characters");
      return;
    }

    if (content.length > 500) {
      toast.error("Content must be at most 500 characters");
      return;
    }

    await createMutation.mutateAsync({
      title,
      content,
      tag,
    });
  };

  return (
    <form className={styles.form}>
      <div className={styles.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          className={styles.input}
          value={draft.title}
          minLength={3}
          maxLength={50}
          required
          onChange={handleFieldChange}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          rows={8}
          className={styles.textarea}
          value={draft.content}
          maxLength={500}
          onChange={handleFieldChange}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          id="tag"
          name="tag"
          className={styles.select}
          value={draft.tag}
          onChange={handleFieldChange}
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>

      <div className={styles.actions}>
        <button
          type="button"
          className={styles.cancelButton}
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          type="submit"
          formAction={handleCreateNote}
          className={styles.submitButton}
          disabled={createMutation.isPending}
        >
          Create note
        </button>
      </div>
    </form>
  );
}
