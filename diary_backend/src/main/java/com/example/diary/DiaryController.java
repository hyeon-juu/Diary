package com.example.diary;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

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
        return diaryRepository.save(diary);
    }

    @GetMapping("/diary/{date}")
    public ResponseEntity<String> getDiaryImage(@PathVariable String date) {
        return diaryRepository.findByDate(date)
            .map(diary -> ResponseEntity.ok(diary.getImage()))
            .orElse(ResponseEntity.notFound().build());
}
}
