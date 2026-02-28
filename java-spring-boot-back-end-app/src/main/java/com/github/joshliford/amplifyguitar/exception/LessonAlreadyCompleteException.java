package com.github.joshliford.amplifyguitar.exception;

public class LessonAlreadyCompleteException extends RuntimeException {
    public LessonAlreadyCompleteException(String message) {
        super(message);
    }
}
