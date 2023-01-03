
import { useEffect } from "react";
import ArticleList from "../components/PostArticle/ArticleList";
import PostArticleForm from "../components/PostArticle/PostArticleForm";
import { titleChangeHandler } from "../utilities/titleChange";


const PostArticlePage = () => {
  
  useEffect(()=>{
    titleChangeHandler("Post Artilces - Name")
  })

  return (
    <>
      <PostArticleForm />
      <ArticleList />
    </>
  );
};

export default PostArticlePage;
