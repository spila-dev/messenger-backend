const welcomeOtherController = (
  req = expressRequest,
  res = expressResponse
) => {
  try {
    res.status(200).json({
      message: "Hey! Welcome to teletalk <3",
    });
  } catch (error) {
    console.log("welcome route catch", error);
    res.errorCollector({ data: { error } });
    res.errorResponser();
  }
};

module.exports = { welcomeOtherController };
