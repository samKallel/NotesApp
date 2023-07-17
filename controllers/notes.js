exports.getNotes = async (req, res) => {
  try {
    res.status(200).send({ msg: "getNotes" });
  } catch (error) {}
};

exports.addNote = async (req, res) => {
  try {
    res.status(200).send({ msg: "addNotes" });
  } catch (error) {}
};

exports.getAll = async (req, res) => {
  try {
    res.status(200).send({ msg: "getAll" });
  } catch (error) {}
};

exports.updateNote = async (req, res) => {
  try {
    res.status(200).send({ msg: "updateNote" });
  } catch (error) {}
};

exports.deleteNote = async (req, res) => {
  try {
    res.status(200).send({ msg: "deleteNote" });
  } catch (error) {}
};
