import { Request, Response } from 'express'
import { IResponse } from '../../interfaces'
import { deleteReserveService } from '../../services/reserve/deleteReserveService'

export const deleteReserveController = async(req: Request, res: Response) =>{
  const { id } = req.params

  try {
    const reserveRetrieved = (await deleteReserveService(id)) as IResponse
    const { status } = reserveRetrieved
    return res.status(status).json(reserveRetrieved)
  } catch (error) {
      return res.status(500).json({
        error
      })
  }
}