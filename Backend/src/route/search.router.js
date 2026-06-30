import {Router} from "express"
import { searchWithAi } from "../controller/search.contoller.js"

const searchRouter = Router()

searchRouter.route('/searchwithai').post(searchWithAi)
searchRouter.route('/debug').get((req,res)=>{
    return res.status(200).json({message : "Debug"})
})
export default searchRouter