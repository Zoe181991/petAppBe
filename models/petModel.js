const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Pet = require("./petSchema");
const User = require("./userSchema");

//findPetUsingId - READ
async function findPetById(id) {
  try {
    const pet = await Pet.findOne({ _id: id });
    return pet;
  } catch (err) {
    console.log(err);
  }
}

//updatePetStatus - Update

async function changeToFosteredStatus(req, res, next) {
  try {
    const update = await Pet.findOneAndUpdate(
      { _id: req.params.petId },
      { adoptionStatus: "Fostered" },
      { new: true }
    );
    next();
  } catch (err) {
    console.log(err);
    res.send(err);
  }
}

async function changeToAvailableStatus(req, res, next) {
  try {
    const update = await Pet.findOneAndUpdate(
      { _id: req.params.petId },
      { adoptionStatus: "Available" },
      { new: true }
    );
    next();
  } catch (err) {
    console.log(err);
    res.send(err);
  }
}

async function changeToAvailableStatusById(petId) {
  try {
    const update = await Pet.findOneAndUpdate(
      { _id: petId },
      { adoptionStatus: "Available" },
      { new: true }
    );
    next();
  } catch (err) {
    console.log(err);
    res.send(err);
  }
}

async function changeToAdoptedStatus(req, res, next) {
  try {
    const update = await Pet.findOneAndUpdate(
      { _id: req.params.petId },
      { adoptionStatus: "Adopted" },
      { new: true }
    );
    next();
  } catch (err) {
    console.log(err);
    res.send(err);
  }
}
//addOwnerconsole

async function removeFromFoster(req, res, next) {
  try {
    const userAfterUpdate = await User.updateOne(
      { _id: req.params.userId },
      { $pull: { fosteredPets: req.params.petId } },
      { new: true }
    );
    next();
  } catch (err) {
    console.log(err);
  }
}

async function addOwner(req, res, next) {
  try {
    const filter = { _id: req.params.petId };
    const petAfterUpdate = await Pet.findOneAndUpdate(
      filter,
      { owner: req.params.userId },
      { new: true }
    );
    next();
  } catch (err) {
    res.send(err);
  }
}

async function clearOwner(req, res, next) {
  try {
    const update = await Pet.findOneAndUpdate(
      { _id: req.params.petId },
      { owner: null },
      { new: true }
    );
    next();
  } catch (err) {
    console.log(err);
    next(err);
  }
}

async function clearOwnerById(petId) {
  try {
    const update = await Pet.findOneAndUpdate(
      { _id: petId },
      { owner: null },
      { new: true }
    );
    return;
  } catch (err) {
    console.log(err);
  }
}

async function addPetModel(newPet) {
  try {
    const register = new Pet(newPet);
    await register.save();
    return register;
  } catch (err) {
    console.log(err);
  }
}

async function deletePetModel(id) {
  const confirm = await Pet.findByIdAndDelete(id);
  return confirm;
}

module.exports = {
  findPetById,
  changeToFosteredStatus,
  addOwner,
  clearOwner,
  clearOwnerById,
  changeToAvailableStatusById,
  changeToAvailableStatus,
  addPetModel,
  changeToAdoptedStatus,
  removeFromFoster,
  deletePetModel,
};
