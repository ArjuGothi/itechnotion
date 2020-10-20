import styled from "styled-components";

const PostWrapper = styled.div`
display:grid;
justify-content:center;
.postClass{
    width:450px;
    height:190px;
    background-color:#111213;
    color:#ddd;
    padding:18px;
    margin:10px;
    .title{
        text-align: center;
        font-size: 17px;
        color:cornflowerblue;
        text-transform:capitalize;
        width: 90%
    }
}
`;
export { PostWrapper };