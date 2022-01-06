package com.niemczuk.fibserver;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import redis.clients.jedis.Jedis;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping(value = "/api/fib-value")
@CrossOrigin(origins = "http://localhost:4200")
@RequiredArgsConstructor
public class ApiController {

    private final FibElementService fibElementService;

    @PostMapping
    public void sendFibPairToRedis(@RequestBody FibPairDto fibPairDto) {
        Jedis jedis = new Jedis("redis", 6379);
        jedis.hset("values", fibPairDto.getFibIndex(), "Not yet calculated");
        fibElementService.saveFibElementIfNotExists(fibPairDto);

        Jedis jedisPublisher = new Jedis("redis", 6379);
        jedisPublisher.publish("insert", fibPairDto.getFibIndex());
    }

    @GetMapping(value = "/{fibIndex}")
    public FibPairDto getFibPairFromRedis(@PathVariable String fibIndex) {
        Jedis jedis = new Jedis("redis", 6379);
        String fibValue = jedis.hget("values", fibIndex);
        return new FibPairDto(fibIndex, fibValue);
    }

    @GetMapping(value = "/all")
    public List<FibPairDto> getAllEnteredFibIndexes() {
        List<FibElement> fibElements = fibElementService.getAllFibElements();

        return fibElements.stream()
                .map(fibElement -> new FibPairDto(fibElement.getValue(), ""))
                .collect(Collectors.toList());
    }

    @GetMapping(value = "/values")
    public List<FibPairDto> getCalculatedValues() {
        Jedis jedis = new Jedis("redis", 6379);
        Map<String, String> fibValuesMap = jedis.hgetAll("values");
        return fibValuesMap.entrySet().stream()
                .map(e -> new FibPairDto(e.getKey(), e.getValue()))
                .collect(Collectors.toList());
    }
}
