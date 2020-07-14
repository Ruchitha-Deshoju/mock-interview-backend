const express = require('express')
const User = require('../models/user')
const { sendWelcomeEmail, sendCancelationEmail } = require('../emails/account')
const router = new express.Router()


router.post('/users', async (req, res) => {
    const user = new User(req.body)
    console.log(req.body)
    try {
        await user.save()
        sendWelcomeEmail(user.email, user.name)
        console.log("okay from nodejs")
        res.status(201).send({user})
    } catch (e) {
        console.log("error")
        res.status(400).send(e)
    }
})

router.post('/users/login', async(req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        console.log("okay form  nodejs")
        res.send({user})
    } catch (e) {
        res.status(400).send()
    }
})



router.get('/users/:id',  async (req, res) => {
    const _id = req.params.id;
    try {
        const user = await user.findById(_id)
        if(!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch(e) {
        res.status(500).send()
    }
})

router.post('/users/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    console.log(updates)
    const allowedUpdates = ['name', 'email','password']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true })
        if(!user) {
            return res.status(404).send()
        }
        await user.save()
        res.send({user})
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/users/delete/:id',async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        sendCancelationEmail(user.email, user.name)
        if(!user) {
            return res.status(404).send()
        }
      
        res.send(user)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router