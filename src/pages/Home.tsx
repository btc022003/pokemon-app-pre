import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const getPokemonImg = (url: string) => {
  // https://pokeapi.co/api/v2/pokemon/1/ 根据url获取id
  const id = url
    .split('/')
    .filter((item) => item)
    .slice(-1)[0];
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${id}.png`;
};

function Home() {
  const [pokemonList, setPokemonList] = useState<any>([]);
  const [page, setPage] = useState(1);
  // 监听page改变之后重新获取数据
  useEffect(() => {
    fetch(
      `https://pokeapi.co/api/v2/pokemon?offset=${(page - 1) * 20}&limit=20`
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res.results);
        setPokemonList([...pokemonList, ...res.results]);
      });
  }, [page]);
  return (
    <>
      <img
        src='https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png'
        className='block mx-auto'
        alt=''
      />
      <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6'>
        {pokemonList.map((item: any) => (
          <Link key={item.url} to={`/${item.name}`}>
            <div className='flex flex-col items-center shadow-md m-2'>
              {item.name}
              <img className='h-48' src={getPokemonImg(item.url)} alt='' />
            </div>
          </Link>
        ))}
      </div>

      <button
        className='bg-red-700 text-white px-8 py-3 mx-auto block'
        onClick={() => setPage(page + 1)}
      >
        加载更多
      </button>
    </>
  );
}

export default Home;
