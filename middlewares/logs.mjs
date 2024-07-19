const logsMiddleware = () => async (ctx, next) => {
    ctx.res.statusCode = 200
    await next();
    console.log(`Request path: ${ctx.path}, Status code: ${ctx.status}`);
};

export default logsMiddleware;