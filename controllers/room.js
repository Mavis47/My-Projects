import Room from "../models/Room.js";
import { createError } from './../utils/error.js';

export const createRoom = async (req,res,next) => {
    
    const RoomId = req.params.Roomid;
    const newRoom = new Room(req.body)

    try{
        const savedRoom = await newRoom.save()
        try {
            await Room.findByIdAndUpdate(RoomId,{
                $push : {rooms: savedRoom._id},
            });
        } catch (err) {
            next(err);
        }
        res.status(200).json(savedRoom);
    }catch(err){
        next(err)
    }
}

export const updateRoom = async(req,res,next)=> {
    try{
        const updatedRoom = await Room.findByIdAndUpdate(req.params.id,{$set: req.body}, {new:true});
        res.status(200).json(updatedRoom);
    }catch(err){
        next(err)
     }
} 

export const deleteRoom = async(req,res,next)=> {
    const RoomId = req.params.Roomid;
    try{
        const DeletedRoom = await Room.findByIdAndDelete(req.params.id);
        try {
            await Room.findByIdAndUpdate(RoomId,{
                $pull : {rooms: req.param.id},
            });
        } catch (err) {
            next(err);
        }
        res.status(200).json("Room Has Been Deleted");
    }catch(err){
        next(err)
     }
} 

export const getRoom = async(req,res,next)=> {
    try{
        const Room = await Room.findById(req.params.id);
        res.status(200).json(Room);
    }catch(err){
        next(err)
     }
} 
export const getAllRoom = async(req,res,next)=> {
    try{
        const Rooms = await Room.find();
        res.status(200).json(Rooms);
    }catch(err){
        next(err)
     }
} 