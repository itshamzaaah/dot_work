const AuthLayout = ({
  title,
  children,
  imgSrc,
  footerText,
  footerLinkText,
  footerLinkOnClick,
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-6">
      <div className="flex flex-col md:flex-row max-w-5xl w-full rounded-3xl shadow-lg overflow-hidden">
        {/* Left Part */}
        <div className="flex flex-col bg-indigo-400 px-4 py-3 md:px-12 md:py-10 w-full md:w-6/12 md:rounded-l-3xl text-white">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-semibold">DotWork</span>
            </div>
            <p className="text-xs font-light mb-8">
              Study Online, Learn Online
            </p>
            <h1 className="text-xl md:text-3xl font-extrabold leading-tight mb-0 md:mb-10">
              AI Based <br />
              Evaluation <br />
              of the assessments
            </h1>
          </div>
          <div className="hidden md:block w-60 flex items-center justify-center mx-auto">
            <img
              src={imgSrc}
              alt="Illustration"
              className="w-full h-full object-cover transition-transform duration-300 ease-in-out transform hover:scale-110"
            />
          </div>
        </div>

        {/* Right Part */}
        <div className="w-full md:w-9/12 bg-indigo-400">
          <div className="bg-white p-4 md:p-10 rounded-3xl shadow-md relative h-full">
            <h2 className="text-2xl font-semibold mb-8">{title}</h2>
            {children}
            {footerText && (
              <p className="text-center text-sm text-gray-400 mt-6">
                {footerText}{" "}
                <button
                  onClick={footerLinkOnClick}
                  className="text-indigo-600 underline"
                >
                  {footerLinkText}
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
