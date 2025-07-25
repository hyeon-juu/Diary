package com.example.diary;

public class DiaryDTO {
    public String date;
    public String title;
    public String content;
    public String image;

    public String getDate() { 
        return date; 
    }
    public void setDate(String date) { 
        this.date = date; 
    }

    public String getTitle(){
        return title;
    }
    public void setTitle(String title){
        this.title = title;
    }

    public String getContent(){
        return content;
    }
    public void setContent(String content){
        this.content = content;
    }

    public String getImage() { 
        return image; 
    }
    public void setImage(String image) {
         this.image = image; 
        }
}
