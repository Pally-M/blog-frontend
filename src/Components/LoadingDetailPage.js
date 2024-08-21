// loading page

const LoadingPage = () => {
    return (
      <div className="flex items-center justify-center h-screen bg-hero-pattern bg-cover bg-white bg-center">
        <div className="flex flex-col items-center">
          <svg
            className="animate-spin h-20 w-20 mb-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="#80B4AB"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="#80B4AB"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zM12 20a8 8 0 01-8-8H0c0 6.627 5.373 12 12 12v-4z"
            ></path>
          </svg>
          <p className="text-black text-lg font-custom mb-4">
            Your journey is about to begine…
          </p>
        </div>
      </div>
    );
  };
  
  export default LoadingPage;