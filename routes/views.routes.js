import { Router } from "express";

const router = Router()

router.get('/realtimeproducts', (req, res) => {
    res.render("realTimeProducts")
})

router.get('/home', (req, res) => {
    res.render("home")
})

export default router