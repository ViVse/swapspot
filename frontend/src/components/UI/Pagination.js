const Pagination = (props) => {
  const backHandler = () => {
    if (+props.currentPage === 1) return;
    props.onPageChange(props.currentPage - 1);
  };

  const nextHandler = () => {
    if (+props.currentPage === +props.totalPages) return;
    props.onPageChange(+props.currentPage + 1);
  };

  return (
    <nav className="flex justify-center mt-5">
      <ul className="xs:mt-0 mt-2 inline-flex items-center -space-x-px">
        <li>
          <button
            className="px-3 rounded-l-lg font-medium border border-green-400 text-base hover:bg-green-200 bg-white py-1"
            onClick={backHandler}>
            Назад
          </button>
        </li>
        {Array.from(Array(props.totalPages).keys()).map((num) => (
          <li key={num}>
            <button
              className={`w-12 border font-medium border-green-400 text-base py-1 ${
                num + 1 === +props.currentPage
                  ? "bg-green-400"
                  : "bg-white hover:bg-green-200"
              }`}
              onClick={() => props.onPageChange(num + 1)}>
              {num + 1}
            </button>
          </li>
        ))}
        <li>
          <button
            className="px-3 rounded-r-lg font-medium border border-green-400 text-base hover:bg-green-200 bg-white py-1"
            onClick={nextHandler}>
            Далі
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
