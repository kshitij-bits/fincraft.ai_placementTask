export const catchAsyncErrors = (para)=>{
    return (req, res, next)=> {
        Promise.resolve(para(req, res, next)).catch(next);
    };
}