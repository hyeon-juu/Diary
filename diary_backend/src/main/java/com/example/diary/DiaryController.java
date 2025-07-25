package com.example.diary;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class DiaryController {

    @Autowired
    private DiaryRepository diaryRepository;

    @PostMapping("/diary")
    public Diary saveDiary(@RequestBody DiaryDTO request) {
        Diary diary = new Diary();
        diary.setDate(request.date);
        diary.setImage(request.image);
        diary.setTitle(request.title);
        diary.setContent(request.content);
        return diaryRepository.save(diary);
    }

    @GetMapping("/diary/{date}")
    public ResponseEntity<DiaryResponseDTO> getDiaryImage(@PathVariable String date) {
        return diaryRepository.findByDate(date)
            .map(diary -> ResponseEntity.ok(
                new DiaryResponseDTO(diary.getTitle(), diary.getContent(), diary.getImage())))
            .orElse(ResponseEntity.notFound().build());
    }
    
}
