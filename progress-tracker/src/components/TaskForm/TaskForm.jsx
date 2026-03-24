import React, { useEffect, useState } from "react";
import Button from "../DesignSystem/Button";
import { SquarePen, Trash } from "lucide-react";
import ButtonIcon from "../DesignSystem/ButtonIcon";

function TaskForm() {
  const [item, setItem] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [itemlist, setItemList] = useState(() => {
    const storedData = localStorage.getItem("tasks");
    return storedData ? JSON.parse(storedData) : [];
  });
  const [showImg, setShowImg] = useState(false);

  function handleClick(e) {
    e.preventDefault();
    if (editIndex !== null) {
      const updatedList = itemlist.map((task, i) =>
        i === editIndex ? { ...task, text: item, completed: false } : task,
      );
      setItemList(updatedList);
      setEditIndex(null);
    } else {
      const newTask = {
        text: item,
        completed: false,
      };
      setItemList([...itemlist, newTask]);
    }

    setItem("");
  }

  function deleteItem(e, index) {
    e.preventDefault();
    let filteredList = itemlist.filter((_, i) => i != index);
    setItemList(filteredList);
    console.log(filteredList);
  }

  function toggleTask(index) {
    const updatedTask = itemlist.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task,
    );
    setItemList(updatedTask);
  }

  function editTask(e, index) {
    e.preventDefault();
    setItem(itemlist[index].text);
    setEditIndex(index);
  }

  const completedTasks = itemlist.filter((task) => task.completed).length;
  const totalTask = itemlist.length;

  const progress = totalTask
    ? Math.round((completedTasks / totalTask) * 100)
    : 0;
  useEffect(() => {
    if (itemlist.length && itemlist.length === completedTasks) {
      setTimeout(() => {
        setShowImg(true);
      }, 100);
    }
  }, [completedTasks]);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(itemlist));
  }, [itemlist]);

  return (
    <div className="flex flex-col justify-center items-center">
      <form>
        <div className="flex gap-4">
          <input
            className="w-72 px-4 py-2 rounded-xl border border-gray-300 
             focus:outline-none focus:ring-2 focus:ring-indigo-400 
             focus:border-indigo-400 transition-all duration-200 
             shadow-sm"
            type="text"
            value={item}
            onChange={(e) => setItem(e.target.value)}
          />
          <button
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-3 cursor-pointer py-1  rounded"
            onClick={handleClick}
          >
            {editIndex !== null ? "Update" : "Add"}
          </button>
        </div>
      </form>

      <div className="mt-8">
        <ul>
          {itemlist.map((items, index) => (
            <div
              key={index}
              className="bg-white shadow-md border p-4 m-2 rounded-xl hover:shadow-lg transition flex gap-2 justify-between items-center"
            >
              <div className="flex items-center gap-2">
                <input
                  checked={items.completed}
                  onChange={() => toggleTask(index)}
                  className="scale-125"
                  type="checkbox"
                />
                <li
                  id={index}
                  className={`font-bold text-xl ${items.completed ? "line-through text-green-500" : ""}`}
                >
                  {items.text}
                </li>
              </div>
              <div className="flex gap-2">
                <ButtonIcon
                  onClick={(e) => editTask(e, index)}
                  varint="info"
                  Icon={SquarePen}
                />
                <ButtonIcon
                  onClick={(e) => deleteItem(e, index)}
                  varint="danger"
                  Icon={Trash}
                />
              </div>
            </div>
          ))}
        </ul>
      </div>

      <div className="w-80 mt-6">
        <div className="w-full bg-gray-300 rounded-full h-4">
          <div
            className="bg-green-500 h-4 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <p className="text-center mt-2 font-semibold">
          {completedTasks} / {itemlist.length} Completed
        </p>
      </div>
      {showImg && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center">
          <div className="bg-white p-4 rounded-xl">
            <img
              src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExanV2MjdidHRhbDZzMnowM3k3NzJ0ZHU0MXk1d2ZnN2ppYmNxNnR4YSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/g9582DNuQppxC/giphy.webp"
              className="w-96 rounded-lg"
            />

            <button
              onClick={() => setShowImg(false)}
              className="mt-3 bg-red-500 text-white px-3 py-1 rounded cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}
      <div className="mt-8 grid grid-cols-3 gap-4 w-96">
        <div className="bg-blue-100 p-4 rounded-xl text-center">
          <p className="text-lg font-bold">{totalTask}</p>
          <p className="text-sm text-gray-600">Total Tasks</p>
        </div>
        <div className="bg-green-100 p-4 rounded-xl text-center">
          <p className="text-lg font-bold">{completedTasks}</p>
          <p className="text-sm text-gray-600">Completed Tasks</p>
        </div>
        <div className="bg-purple-100 p-4 rounded-xl text-center">
          <p className="text-lg font-bold">{progress}%</p>
          <p className="text-sm text-gray-600">Completion</p>
        </div>
      </div>
    </div>
  );
}

export default TaskForm;
