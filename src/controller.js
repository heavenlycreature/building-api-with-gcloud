const { nanoid } = require("nanoid");
const notes = require("./notes");

const addNoteHandler = (request, h) => {
  const { title, tags, body } = request.payload;

  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newNote = {
    id,
    title,
    tags,
    body,
    createdAt,
    updatedAt,
  };

  notes.push(newNote);
  const isSuccess = notes.filter((note) => note.id === id).length > 0;
  if (isSuccess) {
    const response = h.response({
      status: "success",
      message: "catatan berhasil di tambahkan!",
      data: {
        noteId: id,
      },
    });
    response.status(201);
    return response;
  }
  const response = h.response({
    status: "fail",
    message: "catatan tidak masuk nih!",
  });
  response.status(404);
  return response;
};

const getAllNotesHandler = (request, h) => {
  if (notes) {
    const response = h.response({
      status: "success",
      data: {
        notes,
      },
    });
    response.status(201);
    return response;
  }
  const response = h.response({
    status: "fail",
    message: "somehow data tidak ada",
  });
  response.status(500);
  return response;
};

const getNoteHandler = (request, h) => {
  const { id } = request.params;

  const note = notes.filter((n) => n.id === id)[0];
  if (!note) {
    const response = h.response({
      status: "success",
      data: {
        note,
      },
    });
    response.status(201);
    return response;
  }
};

const updateNoteHandler = (request, h) => {
  const { id } = request.params;
  const { title, tags, body } = request.payload;
  const updatedAt = new Date().toISOString();

  const index = notes.findIndex((note) => note.id === id);
  if (!index) {
    const response = h.response({
      status: "fail",
      message: "somehow data tidak ada",
    });
    response.status(404);
    return response;
  }
  notes[index] = {
    ...notes[index],
    title,
    body,
    tags,
    updatedAt,
  };
  const response = h.response({
    status: "success",
    message: "Berhasil memperbarui data",
  });
  response.status(201);
  return response;
};

const deleteNoteHandler = (request, h) => {
  const { id } = request.params;

  const note = notes.findIndex((n) => n.id === id);

  if (!note) {
    const response = h.response({
      status: "fail",
      message: "somehow data tidak ada",
    });
    response.status(404);
    return response;
  }
  notes.splice(note, 1);
  const response = h.response({
    status: "success",
    message: "Berhasil menghapus data",
  });
  response.status(201);
  return response;
};
module.exports = {
  addNoteHandler,
  getAllNotesHandler,
  getNoteHandler,
  updateNoteHandler,
  deleteNoteHandler,
};
