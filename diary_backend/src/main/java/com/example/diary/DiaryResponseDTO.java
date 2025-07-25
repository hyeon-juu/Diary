package com.example.diary;

public class DiaryResponseDTO {
    private String title;
    private String content;
    private String image;

    public DiaryResponseDTO(String title, String content, String image) {
            this.title = title;
            this.content = content;
            this.image = image;
        }
    public String getTitle() { return title; }
    public String getContent() { return content; }
    public String getImage() { return image; }
}
