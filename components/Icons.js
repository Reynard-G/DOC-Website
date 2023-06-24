import { IconContext } from "react-icons";
import { FaChevronDown, FaMoneyBillWave, FaMap, FaBookOpen, FaClipboardCheck } from "react-icons/fa";
import { AiOutlineBarChart, AiOutlineLineChart, AiOutlinePieChart, AiFillQuestionCircle } from "react-icons/ai";

function ChevronDown(props) {
  return (
    <IconContext.Provider value={{ color: props.color, className: props.className, size: props.size }}>
      <FaChevronDown />
    </IconContext.Provider>
  );
};

function BarChart(props) {
  return (
    <IconContext.Provider value={{ color: props.color, className: props.className, size: props.size }}>
      <AiOutlineBarChart />
    </IconContext.Provider>
  );
};

function LineChart(props) {
  return (
    <IconContext.Provider value={{ color: props.color, className: props.className, size: props.size }}>
      <AiOutlineLineChart />
    </IconContext.Provider>
  );
};

function PieChart(props) {
  return (
    <IconContext.Provider value={{ color: props.color, className: props.className, size: props.size }}>
      <AiOutlinePieChart />
    </IconContext.Provider>
  );
};

function MoneyBill(props) {
  return (
    <IconContext.Provider value={{ color: props.color, className: props.className, size: props.size }}>
      <FaMoneyBillWave />
    </IconContext.Provider>
  );
};

function Map(props) {
  return (
    <IconContext.Provider value={{ color: props.color, className: props.className, size: props.size }}>
      <FaMap />
    </IconContext.Provider>
  );
}

function OpenBook(props) {
  return (
    <IconContext.Provider value={{ color: props.color, className: props.className, size: props.size }}>
      <FaBookOpen />
    </IconContext.Provider>
  );
}

function CheckList(props) {
  return (
    <IconContext.Provider value={{ color: props.color, className: props.className, size: props.size }}>
      <FaClipboardCheck />
    </IconContext.Provider>
  );
}

function QuestionMark(props) {
  return (
    <IconContext.Provider value={{ color: props.color, className: props.className, size: props.size }}>
      <AiFillQuestionCircle />
    </IconContext.Provider>
  );
}

export const icons = {
  chevronDown: ChevronDown,
  barChart: BarChart,
  lineChart: LineChart,
  pieChart: PieChart,
  moneyBill: MoneyBill,
  map: Map,
  openBook: OpenBook,
  checkList: CheckList,
  questionMark: QuestionMark
};