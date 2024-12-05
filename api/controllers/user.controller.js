export const test = (req, res)=>{
try {
    res.json({msg : 'Testing'});
} catch (error) {
    console.log(error)
}
}