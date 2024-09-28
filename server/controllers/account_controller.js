import Account from "../models/Account.js";

export async function getAccount(req, res){
    const { userName } = req.params;
    try {
        const user = await Account.findOne({userName});
        if (user)
            return res.status(200).json({success: true, user});

        return res.status(404).json({success: false});
    } catch (error) {
        res.status(500).json({success: false, error: error.message});
    }
}

export async function updateAccount(req, res){
    const { userName } = req.params;
    try {
        const user = await Account.findOneAndUpdate(
            {userName},
            {$set: req.body},
            {new: true}
        );
        if(user)
            return res.status(200).json({success: true});

        return res.status(400).json({success: false, message: "Invalid data"});
    } catch (error) {
        res.status(500).json({success: false, error: error.message});
    }
}

export async function deleteAccount(req, res){
    const { userName } = req.params;
    try {
        const user = await Account.findOneAndDelete({userName})
        if(user)
            return res.status(200).json({success: true});

        return res.status(400).json({success: false, message: "Invalid data"});
    } catch (error) {
        res.status(500).json({success: false, error: error.message});
    }
}