const logoutNormalUserController = async (
  req = expressRequest,
  res = expressResponse
) => {
  try {
    res.status(200).json({ ok: true });
  } catch (error) {
    console.log("logoutNormalUserController", error);
    res.errorCollector({ data: { error } });
    res.errorResponser();
  }
};

module.exports = { logoutNormalUserController };