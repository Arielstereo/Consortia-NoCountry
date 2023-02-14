import {Request, Response} from 'express'
import { IResponse } from '../../interfaces'
import { postReserveService } from '../../services/reserve/postReserveService'

export const postReserveController = async(req: Request, res: Response)=> {
  const reserve = req.body

  try{
    const reserveRetrieved = (await postReserveService(reserve)) as IResponse

    const { status } = reserveRetrieved

    return res.status(status).json(reserveRetrieved)
  } catch(error){
      return res.status(500).json({
        error
      })
  }
}