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