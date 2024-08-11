import React, { useState, useRef } from "react";
import {Trash2, Edit2, Printer, XCircle } from "lucide-react"; // Import XCircle for the clear button

const MenuMakananDanMinuman = () => {
  const [menuItems, setMenuItems] = useState([]); // Start with an empty menu

  const [newItem, setNewItem] = useState({
    name: "",
    quantity: "1", // Initialize as a string for text input
    price: "",
    description: "",
  });

  const [editingIndex, setEditingIndex] = useState(null);

  // Create a ref for the price input field
  const priceInputRef = useRef(null);

  const formatRupiah = (amount) => {
    const numberString = amount.replace(/[^,\d]/g, ""); // Remove all non-numeric characters
    const numberValue = parseInt(numberString, 10) || 0; // Convert to integer and handle empty input

    const numberFormatted = numberValue.toLocaleString("id-ID"); // Convert back to formatted string
    return numberFormatted;
  };

  const addMenuItem = () => {
    const priceInNumber = parseInt(newItem.price.replace(/\./g, ""), 10);
    const quantityInNumber = parseInt(newItem.quantity, 10) || 1;

    if (newItem.name && priceInNumber > 0) {
      if (editingIndex !== null) {
        const updatedItems = [...menuItems];
        updatedItems[editingIndex] = {
          ...newItem,
          price: priceInNumber,
          quantity: quantityInNumber,
        };
        setMenuItems(updatedItems);
        setEditingIndex(null);
      } else {
        setMenuItems([
          ...menuItems,
          {
            ...newItem,
            price: priceInNumber,
            quantity: quantityInNumber,
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
    setNewItem({
      ...itemToEdit,
      price: formatRupiah(itemToEdit.price.toString()),
    });
    setEditingIndex(index);
  };

  const resetForm = () => {
    setNewItem({ name: "", quantity: "1", price: "", description: "" });
    setEditingIndex(null);
  };

  const handleQuantityChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setNewItem({
        ...newItem,
        quantity: value,
      });
    }
  };

  const handlePriceChange = (e) => {
    const value = e.target.value;
    setNewItem({
      ...newItem,
      price: formatRupiah(value),
    });
  };

  const handleQuantityBlur = () => {
    if (newItem.quantity === "") {
      setNewItem({
        ...newItem,
        quantity: "1",
      });
    }
  };

  const handlePriceBlur = () => {
    if (newItem.price === "") {
      setNewItem({
        ...newItem,
        price: "0",
      });
    }
  };

  const handleClearPrice = () => {
    setNewItem({
      ...newItem,
      price: "",
    });
    // Focus on the price input field
    if (priceInputRef.current) {
      priceInputRef.current.focus();
    }
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
      </header>

      <main className="p-4">
        {/* Display the title in the web view */}
        <h2 className="text-lg font-semibold mb-4 daftar-menu-title">
          Daftar Menu
        </h2>

        <section id="print-section">
          {menuItems.map((item, index) => (
            <div
              key={index}
              className="bg-gray-100 p-2 rounded mb-1 flex justify-between items-center"
            >
              <div className="text-sm">
                <p className="font-semibold">{item.name}</p>
                <p className="text-xs text-gray-600 mt-1 print-description">
                  {item.description}
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  {item.quantity} x Rp {item.price.toLocaleString('id-ID')}
                </p>
              </div>
              <div className="flex flex-col items-end">
                {/* Subtotal is hidden on the web and only shown on print */}
                <span className="text-xs text-gray-800 print-only print-subtotal hidden">
                  Rp {(item.quantity * item.price).toLocaleString('id-ID')}
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
            <p className="font-bold">Rp {total.toLocaleString('id-ID')}</p>
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
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                value={newItem.quantity}
                onChange={handleQuantityChange}
                onBlur={handleQuantityBlur}
                placeholder="1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Harga
              </label>
              <div className="relative">
                <input
                  type="text"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 pr-12"
                  placeholder="Rp 0"
                  value={newItem.price}
                  onChange={handlePriceChange}
                  onBlur={handlePriceBlur}
                  ref={priceInputRef} // Set ref to the price input
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 px-3 flex items-center"
                  onClick={handleClearPrice}
                  onBlur={handlePriceBlur}
                >
                  <XCircle className="text-gray-500" />
                </button>
              </div>
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
            Total: Rp {total.toLocaleString('id-ID')}
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
            font-size: 18px; /* Increased font size for better readability */
          }
          #print-section .font-semibold {
            font-size: 24px; /* Increased for better readability */
          }
          #print-section .text-xs {
            font-size: 16px; /* Increased for better readability */
          }
          #print-section .print-description {
            margin-top: 12px; /* Space between name and description */
          }
          #print-section .print-total {
            font-size: 22px; /* Increased for better readability */
            margin-top: 14px;
            border-top: 1px solid #000;
            padding-top: 10px;
          }
          #print-section .print-total .font-bold {
            font-size: 26px; /* Increased for better readability */
          }
          #print-section .print-subtotal {
            font-size: 20px; /* Increased for better readability */
            margin-top: 6px; /* Adjusted space for subtotal */
            display: block;
          }
          .daftar-menu-title {
            display: none;
          }
          .icons {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default MenuMakananDanMinuman;
