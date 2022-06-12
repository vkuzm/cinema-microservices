#!/bin/bash
gradle --stop
gradle build --continuous &
gradle bootRun -Dagentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=5005