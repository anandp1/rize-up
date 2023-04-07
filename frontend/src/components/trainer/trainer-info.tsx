const TrainerInfo = () => {
  const classes = {
    containers: "bg-white rounded-lg shadow-lg p-6 mx-8",
  };

  return (
    <div className={classes.containers}>
      <div className="flex items-center mb-4">
        <div>
          <h2 className="text-xl font-bold mb-1">Joe</h2>
          <p className="text-gray-500 text-sm">
            Personal Trainer • joe@example.com • 35 • Male
          </p>
        </div>
      </div>
      <div className="flex flex-wrap -mx-2">
        <div className="w-full md:w-1/2 px-2 mb-4">
          <h3 className="text-lg font-bold mb-2">General Information</h3>
          <ul className="list-disc list-inside">
            <li>
              I am a certified personal trainer with over 10 years of
              experience.
            </li>
            <li>I like Weightlifting, running, and swimming</li>
          </ul>
        </div>
        <div className="w-full md:w-1/2 px-2 mb-4">
          <h3 className="text-lg font-bold mb-2">Experience</h3>
          <ul className="list-disc list-inside">
            <li>Trainer Experience: 10 years</li>
            <li>
              Description: I have trained people of all ages and fitness levels,
              helping them achieve their goals and live a healthier lifestyle.
            </li>
            <li>Education: {"Bachelor's"} degree in Exercise Science</li>
            <li>Years of Experience: 10 years</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TrainerInfo;
