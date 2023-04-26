import Link from "next/link";
import React, { useState, useRef } from "react";

export default function Home() {
  const defaultFormData = {
    apiKey: "",
    product: "be active program",
    summary: "10 ways to move more",
    headline: 60,
    body: 200,
    cta: 15,
    versions: 4,
  };

  const [formData, setFormData] = useState(defaultFormData);
  const [result, setResult] = useState([]);

  const handleInput = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;

    setFormData((prevState) => ({
      ...prevState,
      [fieldName]: fieldValue,
    }));
  };

  const copyToClipboard = (e) => {
    const copyText = e.target.previousSibling;
    copyText.select();
    document.execCommand("copy");
  };

  const submitForm = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/ai", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        accept: "application/json",
      },
    });

    const result = await response.json();
    setResult(result);
  };

  return (
    <div className="w-full max-w-lg m-auto">
      <h1 className="text-3xl font-extrabold">Form to send data to OpenAI</h1>
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 my-4"
        onSubmit={submitForm}
      >
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            name="password"
          >
            Key
          </label>
          <input
            className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            name="apiKey"
            type="password"
            placeholder="******************"
            onChange={handleInput}
            value={formData.apiKey}
          />
          <p className="text-red-500 text-xs italic">
            Enter your{" "}
            <Link
              href="https://beta.openai.com/account/api-keys"
              className="text-blue-600 hover:text-blue-800 hover:underline"
            >
              OpenAI Key
            </Link>{" "}
            or use the env file.
          </p>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            name="product"
          >
            Product
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            name="product"
            value={formData.product}
            onChange={handleInput}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            name="summary"
          >
            Summary
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            name="summary"
            value={formData.summary}
            onChange={handleInput}
            // defaultValue="10 ways to move more"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            name="headline"
          >
            Headline
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="number"
            name="headline"
            value={formData.headline}
            onChange={handleInput}
            // defaultValue={60}
            min={10}
            max={120}
            step={5}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            name="body"
          >
            Body
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="body"
            type="number"
            name="body"
            value={formData.body}
            onChange={handleInput}
            // defaultValue={200}
            min={100}
            max={300}
            step={10}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            name="cta"
          >
            CTA
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="number"
            name="cta"
            value={formData.cta}
            onChange={handleInput}
            min={1}
            max={30}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            name="versions"
          >
            Versions
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="versions"
            type="number"
            placeholder="4"
            value={formData.versions}
            onChange={handleInput}
            min={1}
            max={10}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Send to OpenAI
          </button>
        </div>
      </form>
      <p>
        {result.map((item, index) => {
          return (
            <>
              <h2 className="text-lg font-bold">Result {index + 1}</h2>
              <section class="flex flex-col justify-center items-center bg-white max-w-lg p-5 rounded shadow-md">
                <div class="mb-3 inline-flex w-full">
                  <input
                    class=" w-full flex-grow border-blue-500 border-solid border rounded py-2 px-4"
                    type="text"
                    placeholder="Enter some text"
                    value={item.headline}
                    id="copyMe"
                  />
                  <button
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
                    onClick={copyToClipboard}
                  >
                    Copy
                  </button>
                </div>
                <div class="mb-3 inline-flex w-full">
                  <textarea
                    class="border-blue-500 border-solid border rounded py-2 px-4 h-auto w-full resize-none"
                    placeholder="Enter some text"
                    value={item.body}
                    rows={Math.ceil(item.body.length / 50)} // assuming average character width of 8 pixels and max width of 200 pixels
                    onChange={(e) => {
                      const newResult = [...result];
                      newResult[index].headline = e.target.value;
                      setResult(newResult);
                    }}
                  />
                  <button
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
                    onClick={copyToClipboard}
                  >
                    Copy
                  </button>
                </div>
                <div class="mb-3 inline-flex w-full">
                  <input
                    class=" w-full flex-grow border-blue-500 border-solid border rounded py-2 px-4"
                    type="text"
                    placeholder="Enter some text"
                    value={item.cta}
                    onChange={(e) => {
                      const newResult = [...result];
                      newResult[index].headline = e.target.value;
                      setResult(newResult);
                    }}
                  />
                  <button
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
                    onClick={copyToClipboard}
                  >
                    Copy
                  </button>
                </div>
              </section>
              <hr className="my-5" />
            </>
          );
        })}
      </p>
      <p className="text-center text-gray-500 text-xs">
        &copy;{new Date().getFullYear()} Jd Fiscus. All rights reserved.
      </p>
    </div>
  );
}
