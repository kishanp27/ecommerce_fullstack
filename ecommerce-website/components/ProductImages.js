import { useState } from "react";
import { styled } from "styled-components";

const Image = styled.img`
    max-width: 100%;
    max-height: 100%;
`
const BigImage = styled.img`
    max-width: 100%;
    max-height: 100%;
`

const ImageButtons = styled.div`
    display: flex;
    gap: 10px;
    margin-top: 10px;
`

const ImageButton = styled.div`
    border: 2px solid #aaa;
    height: 40px;
    padding: 2px;
    cursor: pointer;
    border-radius: 5px;
    ${
        props => props.active ? `
        border-color: #ccc` : `
        border-color: transparent`
    }
`
const BigImageWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    max-height: 300px;
    max-width: 300px;
`

export default function ProductImages({ images }) {
    const [activeImage, setActiveImage] = useState(images?.[0]);
    return (
        <>
            <BigImageWrapper>
                <BigImage src={activeImage} alt="" />
            </BigImageWrapper>
            <ImageButtons>
                {images.map(image => (
                    <ImageButton
                        active={image === activeImage}
                        onClick={() => setActiveImage(image)} key={image}>
                        <Image src={image} alt="" />
                    </ImageButton>
                ))}
            </ImageButtons>
        </>
    )
}