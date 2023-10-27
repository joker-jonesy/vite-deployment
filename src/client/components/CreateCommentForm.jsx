import {useState} from "react";
import TextInput from "./inputs/TextInput";
import {useAddCommentMutation} from "../redux/api/comments";
import Button from "./inputs/Button";
import {useDispatch, useSelector} from "react-redux";
import {notify} from "../redux/slices/notificationSlice";
function CreateCommentForm(props){
    const {postId} = props;
    const me = useSelector(state=>state.auth.credentials.user);
    const [addComment]=useAddCommentMutation();
    const dispatch = useDispatch()
    const notLength = useSelector(state=>state.length)

    const [text, setText]=useState("");

    const onSubmit = async()=>{
        if(text.length>=3){
            await addComment({
                text:text,
                authorId: Number(me.userId),
                postId: postId
            }).then(()=>{

                setText("");
                dispatch(notify({
                    id: notLength,
                    type:"success",
                    text:"Post Created!",
                    active:true
                }))
            }).catch(()=>{
                dispatch(notify({
                    id: notLength,
                    type:"fail",
                    text:"Error posting",
                    active:true
                }))
            })
        }

    }

    return(
        <div className={"createForm"}>
            <h1>Create a Comment</h1>
            <TextInput type={"text"} vl={text} chg={setText}/>
            <Button click={onSubmit} vl={"COMMENT"} theme={"submit"}/>
        </div>
    )
}

export default CreateCommentForm;