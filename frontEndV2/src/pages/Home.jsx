import React from 'react';

const Home = () => {
  const returnCards = (i) => {
    return (
      <div className="card bg-base-100 w-96 flex-1 shadow-sm">
        <figure>
          <img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp" alt="Shoes" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">Card Title {i}</h2>
          <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
          <div className="card-actions justify-start">
            <div className="badge badge-outline">Fashion</div>
            <div className="badge badge-outline">Products</div>
          </div>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Buy Now</button>
          </div>
        </div>
      </div>
    );
  };
  const renderCarousel = () => {
    return (
      <div className="carousel rounded-box my-4">
        <div className="carousel-item">
          <img src="https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp" alt="Drink" />
        </div>

        <div className="carousel-item">
          <img src="https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.webp" alt="Burger" />
        </div>
        <div className="carousel-item">
          <img src="https://img.daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.webp" alt="Burger" />
        </div>
        <div className="carousel-item">
          <img src="https://img.daisyui.com/images/stock/photo-1494253109108-2e30c049369b.webp" alt="Burger" />
        </div>
        <div className="carousel-item">
          <img src="https://img.daisyui.com/images/stock/photo-1550258987-190a2d41a8ba.webp" alt="Burger" />
        </div>
        <div className="carousel-item">
          <img src="https://img.daisyui.com/images/stock/photo-1559181567-c3190ca9959b.webp" alt="Burger" />
        </div>
        <div className="carousel-item">
          <img src="https://img.daisyui.com/images/stock/photo-1601004890684-d8cbf643f5f2.webp" alt="Burger" />
        </div>
      </div>
    );
  };
  return (
    <div className="max-w-8xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-xl text-center sm:px-6 lg:px-8">
        <div className="px-4 py-3 sm:px-0">
          <h1 className="mb-4 text-3xl font-bold text-gray-900">Welcome to Our Store</h1>
          <p className="text-xl text-gray-600">Discover amazing products at great prices!</p>
        </div>
      </div>
      <div className="divider" />
      <div className="flex flex-wrap gap-8 mb-10">
        {Array(4)
          .fill(1)
          .map((e, i) => returnCards(i))}
      </div>
      <div className="flex flex-wrap gap-8">
        {Array(4)
          .fill(1)
          .map((e, i) => returnCards(i))}
      </div>
      <div className="divider" />
      {renderCarousel()}
    </div>
  );
};

export default Home;