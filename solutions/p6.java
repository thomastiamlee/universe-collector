import java.util.Scanner;

public class Main {
  public static void main(String[] args) {
    Scanner s = new Scanner(System.in);
    int n = s.nextInt();
    int factors = 0;

    for (int i = 1; i <= n; i++) {
      if (n % i == 0) {
        factors++;
      }
    }

    if (factors == 2) {
      System.out.println("prime");
    }
    else {
      System.out.println("not prime");
    }
  }
}
