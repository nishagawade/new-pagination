import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Pagination from './components/Pagination';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1) 
  useEffect(() => {

    const fetchPosts = async () => {
      const getPost = await axios.get('https://jsonplaceholder.typicode.com/posts').then((res) => {
        console.log(res.data);
        setPosts(res.data)
      })
    }

    fetchPosts()

  }, [])

  const indexOfLastPost = currentPage*postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currPost = posts.slice(indexOfFirstPost , indexOfLastPost)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  return (
    <div className='container mt-3'>
      <ul className='list-group mb-4'>
        {
          currPost.map((post) => (
            <li className='list-group-item'>{post.title}</li>
          ))
        }
      </ul>

      <div className='mt-4 mr-3 d-flex justify-content-end'>
         <Pagination 
           postsPerPage={postsPerPage}
           totalPosts={posts.length}
           currentPage={currentPage}
           paginate={paginate}
          
         />

      </div>
    </div>
  )
}

export default App