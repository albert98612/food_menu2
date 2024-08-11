import React, { useState } from "react";
import { X, Trash2, Edit2, Printer } from "lucide-react";

const MenuMakananDanMinuman = () => {
  const [menuItems, setMenuItems] = useState([
    {
      name: "Nasi Goreng",
      price: 15000,
      quantity: 1,
      description: "Nasi goreng spesial",
    },
    {
      name: "Ayam Kecap",
      price: 18000,
      quantity: 1,
      description: "Ayam kecap manis",
    },
  ]);

  const [newItem, setNewItem] = useState({
    name: "",
    quantity: 1,
    price: 0,
    description: "",
  });

  const [editingIndex, setEditingIndex] = useState(null);

  const addMenuItem = () => {
    if (newItem.name && newItem.price > 0) {
      if (editingIndex !== null) {
        const updatedItems = [...menuItems];
        updatedItems[editingIndex] = {
          ...newItem,
          price: parseInt(newItem.price, 10),
          quantity: parseInt(newItem.quantity, 10),
        };
        setMenuItems(updatedItems);
        setEditingIndex(null);
      } else {
        setMenuItems([
          ...menuItems,
          {
            ...newItem,
            price: parseInt(newItem.price, 10),
            quantity: parseInt(newItem.quantity, 10),
          },
        ]);
      }
      resetForm();
    }
  };

  const deleteMenuItem = (index) => {
    const updatedItems = menuItems.filter((_, i) => i !== index);
    setMenuItems(updatedItems);
  };

  const editMenuItem = (index) => {
    const itemToEdit = menuItems[index];
    setNewItem({ ...itemToEdit });
    setEditingIndex(index);
  };

  const resetForm = () => {
    setNewItem({ name: "", quantity: 1, price: 0, description: "" });
    setEditingIndex(null);
  };

  const handleQuantityChange = (e) => {
    const value = e.target.value;
    setNewItem({
      ...newItem,
      quantity: value === "" ? "" : parseInt(value, 10) || 0,
    });
  };

  const handlePrint = () => {
    window.print();
  };

  const total = menuItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <header className="bg-gray-800 text-white px-4 py-2 flex justify-between items-center">
        <h1 className="text-xl font-bold">Menu Makanan dan Minuman</h1>
        <X className="cursor-pointer" />
      </header>

      <main className="p-4">
        {/* Display the title in the web view */}
        <h2 className="text-lg font-semibold mb-4 daftar-menu-title">
          Daftar Menu
        </h2>

        <section id="print-section">
          {menuItems.map((item, index) => (
            <div key={index} className="bg-gray-100 p-2 rounded mb-1 flex justify-between items-center">
              <div className="text-sm">
                <p className="font-semibold">{item.name}</p>
                <p className="text-xs text-gray-600">{item.description}</p>
                <p className="text-xs text-gray-600 mt-1">
                  {item.quantity} x Rp {item.price.toLocaleString()}
                </p>
              </div>
              <div className="flex flex-col items-end">
                {/* Subtotal is hidden on the web and only shown on print */}
                <span className="text-xs text-gray-800 print-only print-subtotal hidden">
                  Rp {(item.quantity * item.price).toLocaleString()}
                </span>
                <div className="flex space-x-2 icons">
                  <Edit2
                    className="text-blue-500 cursor-pointer"
                    onClick={() => editMenuItem(index)}
                  />
                  <Trash2
                    className="text-red-500 cursor-pointer"
                    onClick={() => deleteMenuItem(index)}
                  />
                </div>
              </div>
            </div>
          ))}

          {/* Total section for print */}
          <div className="flex justify-between items-center mt-4 print-only print-total">
            <p className="font-semibold">Total</p>
            <p className="font-bold">Rp {total.toLocaleString()}</p>
          </div>
        </section>

        <section className="mt-6">
          <h2 className="text-xl font-semibold mb-4">
            {editingIndex !== null ? "Edit Menu" : "Tambah Menu"}
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Nama
              </label>
              <input
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                placeholder="Masukkan nama menu"
                value={newItem.name}
                onChange={(e) =>
                  setNewItem({ ...newItem, name: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Kuantitas
              </label>
              <input
                type="number"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                value={newItem.quantity}
                onChange={handleQuantityChange}
                min="1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Harga
              </label>
              <input
                type="number"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                placeholder="0"
                value={newItem.price}
                onChange={(e) =>
                  setNewItem({ ...newItem, price: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Keterangan
              </label>
              <textarea
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                placeholder="Masukkan keterangan"
                value={newItem.description}
                onChange={(e) =>
                  setNewItem({ ...newItem, description: e.target.value })
                }
              ></textarea>
            </div>
            <div className="flex space-x-2">
              <button
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
                onClick={addMenuItem}
              >
                {editingIndex !== null ? "Update Menu" : "Tambah Menu"}
              </button>
              {editingIndex !== null && (
                <button
                  className="flex-1 bg-gray-300 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-400 transition duration-300"
                  onClick={resetForm}
                >
                  Batal
                </button>
              )}
            </div>
          </div>
        </section>

        <footer className="mt-6 flex justify-between items-center">
          <p className="text-xl font-bold">
            Total: Rp {total.toLocaleString()}
          </p>
          <button
            className="bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition duration-300 flex items-center"
            onClick={handlePrint}
          >
            <Printer className="mr-2" /> Print
          </button>
        </footer>
      </main>

      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #print-section, #print-section * {
            visibility: visible;
          }
          #print-section {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            margin: 0;
            padding: 0;
          }
          .icons {
            display: none;
          }
          @page {
            size: A6;
            margin: 5mm; /* adjust as needed */
          }
          #print-section div {
            margin-bottom: 4px; /* reduces space between menu items */
            padding: 2px; /* reduce padding to make it compact */
          }
          p {
            margin: 0;
            padding: 0;
          }
          #print-section .font-semibold {
            font-size: 20px; /* Larger font for name */
          }
          #print-section .text-xs {
            font-size: 18px; /* Larger font for description and quantity */
          }
          .print-total {
            font-size: 20px;
            margin-top: 12px;
            border-top: 1px solid #000;
            padding-top: 10px;
          }
          .print-total .font-bold {
            font-size: 24px; /* Larger font for total */
          }
          .print-subtotal {
            font-size: 18px; /* Subtotal font size */
            display: block;
          }
          .daftar-menu-title {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default MenuMakananDanMinuman;
