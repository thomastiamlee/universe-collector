import java.util.Scanner;
public class Main {
public static void main(String[] args) {
    Scanner s = new Scanner(System.in);
    int n = s.nextInt();
    int total = 0;
    while (n > 0) {
        int ld = n % 10;
        if (ld % 2 == 0) {
            total += ld;
        }
        n /= 10;
    }
    System.out.println(total);
}
}