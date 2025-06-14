interface FooterProps {
  resetFeedingStatus: () => void;
}

const Footer = ({ resetFeedingStatus }: FooterProps) => {
  return (
    <footer className="bg-slate-800 text-white p-4 mt-8">
      <div className="container mx-auto flex justify-between items-center">
        <p>ji</p>

        <button
          onClick={resetFeedingStatus}
          className="bg-red-500 text-white px-3 py-1 rounded-md text-sm"
        >
          Reset
        </button>
      </div>
    </footer>
  );
};

export default Footer;
