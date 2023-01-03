import { useEffect } from "react"
import Articles from "../components/Review/Articles"
import { titleChangeHandler } from "../utilities/titleChange";

const ReviewerPage = () =>{
    useEffect(()=>{
        titleChangeHandler("Review - Name")
    },[])
    return <Articles></Articles>
}

export default ReviewerPage