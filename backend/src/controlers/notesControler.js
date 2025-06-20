import Note from "../models/Note.js";


export async function getAllNotes(_, res) {
  try {
    const notes = await Note.find().sort({createdAt:-1});
    res.status(200).json(notes);
    console.log(notes);
  } catch (error) {
    console.error("Error in getAllNotes =>", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function getNoteById(req, res) {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: "Note not found" });
    res.json(note)
  } catch (error) {
    console.error("Error in getNotesById =>", error);
    res.status(500).json({ message: "Internal server error" }); 
  }
}

export async function createNote(req, res) {
  try {
    const { title, content } = req.body;
    const note = new Note({ title, content });

    const saveNote = await note.save();
    res.status(201).json(saveNote);
  } catch (error) {
    console.error("Error in createNote =>", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function updateNote(req, res) {
  try {
    const { title, content } = req.body;
    const updateNote = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true }
    );

    if (!updateNote) return res.status(404).json({ message: "Note not found" });

    res.status(200).json(updateNote);
  } catch (error) {
    console.error("Error in updateNote =>", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function deleteNote(req, res) {
  try {
    const deleteNote = await Note.findByIdAndDelete(req.params.id);
    if (!deleteNote) return res.status(404).json({ message: "Note not found" });

    res.json({ message: "Note deleted successfully" });
  } catch (error) {
    console.error("Error in deleteNote =>", error);
    res.status(500).json({ message: "Internal server error" });
  }
}


