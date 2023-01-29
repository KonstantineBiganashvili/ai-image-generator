import React, { useState, useEffect } from 'react';
import { Loader, FormField, CardGrid } from '../components';

interface PostsInterface {
  _id: string;
  name: string;
  prompt: string;
  photo: string;
}

const Home: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState<PostsInterface[]>([]);
  const [searchedResults, setSearchedResults] = useState<PostsInterface[]>([]);
  const [searchTimeout, setSearchTimeout] = useState<any>(null);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResults = posts.filter(
          (item) =>
            item.name.toLowerCase().includes(searchText.toLowerCase()) ||
            item.prompt.toLowerCase().includes(searchText.toLowerCase())
        );

        setSearchedResults(searchResults);
      }, 500)
    );
  };

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);

      try {
        const response = await fetch('http://localhost:8080/api/v1/post', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const result = await response.json();

          setPosts(result.data.reverse());
        }
      } catch (error) {
        alert(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[#222328]">Showcase</h1>
        <p className="mt-2 text-[#666e75] text-[16px] max-w[500px]">
          Browse Through Images Created By Users Through DALL-E AI
        </p>
      </div>

      <div className="mt-16">
        <FormField
          labelName="Search Posts"
          type="text"
          name="text"
          placeholder="Search Posts"
          value={searchText}
          onChange={handleSearchChange}
        />
      </div>

      <div className="mt-10">
        {loading ? (
          <div className="flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          searchText && (
            <h2 className="font-medium text-[#666e75] text-xl mb-3">
              Showing Results For{' '}
              <span className="text-[#222328]">{searchText}</span>
            </h2>
          )
        )}
        {searchText ? (
          <CardGrid data={searchedResults} title="No Searched Results Found" />
        ) : (
          <CardGrid data={posts} title="No Posts Found" />
        )}
      </div>
    </section>
  );
};

export default Home;
